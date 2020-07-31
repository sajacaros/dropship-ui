import React, { Component } from 'react';
import axios from 'axios';
import Status from '../component/Status';
import Refresh from '../component/Refresh';
import History from '../component/History';
import './SummaryBoard';
import './SummaryBoard.css';
import { trackPromise } from 'react-promise-tracker';

class SummaryBoard extends Component {
  maxHistory = 50;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPending: false,
      projects: [],
      nowDate: new Date(),
      histories: [],
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

  getSummary = async () => {
    this.doPending();
    const {
      data: { projects },
    } = await axios.get(this.basicUrl + '/summary');

    this.setState({ projects, isLoading: false, nowDate: new Date() });
    this.doIdle();
  };

  componentDidMount() {
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
          .finally(() => this.doIdle()),
      );
    };
  }

  start = this.controlEndpoint('start');
  stop = this.controlEndpoint('stop');
  update = this.controlEndpoint('update');

  render() {
    const { projects, isLoading, nowDate, isPending } = this.state;

    return (
      <>
        <section className="container">
          <Refresh
            refresh={this.getSummary}
            nowDate={nowDate.toLocaleString()}
            isPending={isPending}
          />
          {isLoading ? (
            <div className="loader">
              <span className="loader_text">'Loading...'</span>
            </div>
          ) : (
            <div className="items">
              {projects
                .sort((p1, p2) => p1.project.localeCompare(p2.project))
                .map((project) => (
                  <Status
                    key={project.project}
                    project={project.project}
                    status={project.status}
                    uptime={project.uptime}
                    pid={project.pid}
                    startF={this.start}
                    stopF={this.stop}
                    updateF={this.update}
                    isPending={isPending}
                  />
                ))}
              <History histories={this.state.histories} />
            </div>
          )}
        </section>
      </>
    );
  }
}

export default SummaryBoard;
