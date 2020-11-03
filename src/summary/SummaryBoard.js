import React, { Component } from 'react';
import axios from 'axios';
import Status from '../component/Status';
import Refresh from '../component/Refresh';
import History from '../component/History';
import './SummaryBoard';
import './SummaryBoard.css';
import { trackPromise } from 'react-promise-tracker';
import StatusTitle from '../component/StatusTitle';
import Dependency from '../component/Dependency';

class SummaryBoard extends Component {
  maxHistory = 50;
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      projects: [],
      nowDate: new Date(),
      histories: [],
      dep: '',
    };

    this.getSummary = this.getSummary.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.update = this.update.bind(this);
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
      this.basicUrl = 'http://192.168.40.147:3001/dropship/api/v1';
    } else {
      this.basicUrl =
        window.location.protocol + '//' + window.location.hostname + ':3001/dropship/api/v1';
    }
  }

  pushHistory(history) {
    if (this.state.histories.length === this.maxHistory) {
      return [].concat(history, ...this.state.histories.slice(0, this.maxHistory - 1));
    } else {
      return [].concat(history, ...this.state.histories);
    }
  }

  getDependency = async () => {
    const {
      data: { dependency },
    } = await axios.get(this.basicUrl + '/dependency');
    console.log(dependency);

    this.setState({ dep: dependency });
  };

  getSummary = async () => {
    this.doPending();
    const {
      data: { projects },
    } = await axios.get(this.basicUrl + '/summary');

    this.setState({ projects, nowDate: new Date() });
    this.doIdle();
  };

  getSync = async () => {
    await axios.post(this.basicUrl + '/sync');
  };

  refresh = async () => {
    this.getSummary().finally(() => this.getDependency());
  };

  sync = async () => {
    this.getSync().finally(() => this.refresh());
  };

  componentDidMount() {
    this.getDependency();
    this.getSummary();
  }

  doPending() {
    this.setState({ isPending: true });
  }

  doIdle() {
    this.setState({ isPending: false });
  }

  controlEndpoint(command) {
    return async (project) => {
      this.doPending();
      await trackPromise(
        axios
          .post(this.basicUrl + '/' + project + '/' + command)
          .then(() => {
            const historyArr = this.pushHistory({
              occuredDate: new Date(),
              project,
              command,
              result: true,
            });
            this.setState({
              histories: historyArr,
            });
            this.getSummary();
          })
          .catch((error) => {
            const historyArr = this.pushHistory({
              occuredDate: new Date(),
              project,
              command,
              result: false,
            });
            this.setState({
              histories: historyArr,
            });
          })
          .finally(() => {
            this.getDependency().finally(() => this.doIdle());
          }),
      );
    };
  }

  start = this.controlEndpoint('start');
  stop = this.controlEndpoint('stop');
  update = this.controlEndpoint('update');

  render() {
    const { projects, nowDate, isPending } = this.state;

    return (
      <section>
        <div className="container">
          <h1 className="manager">SmartSee Server Manager</h1>
          <div className="refresh-bar">
            <Dependency dep={this.state.dep} />
            <Refresh
              refresh={this.refresh}
              sync={this.sync}
              nowDate={nowDate.toLocaleString()}
              isPending={isPending}
            />
          </div>

          {
            <>
              <div className="status-box">
                <StatusTitle />
                <div className="items">
                  {projects
                    .sort((p1, p2) => p1.project.localeCompare(p2.project))
                    .map((project) => (
                      <Status
                        className="item"
                        key={project.project}
                        project={project.project}
                        status={project.status}
                        uptime={project.uptime}
                        pid={project.pid}
                        version={project.version}
                        startF={this.start}
                        stopF={this.stop}
                        updateF={this.update}
                        isPending={isPending}
                      />
                    ))}
                </div>
                <History histories={this.state.histories} />
              </div>
            </>
          }
        </div>
      </section>
    );
  }
}

export default SummaryBoard;
