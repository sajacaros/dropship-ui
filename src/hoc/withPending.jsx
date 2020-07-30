import React from 'react';

export default function (pendingMessage = 'Pending') {
  return function withPending(WrappedComponent) {
    const { displayName, name: componentName } = WrappedComponent;
    const wrappedComponentName = displayName || componentName;

    function WithPending({ isPending, ...otherProps }) {
      if (isPending) return pendingMessage;
      return <WrappedComponent {...otherProps} />;
    }

    WithPending.displayName = `withLoading(${wrappedComponentName})`;
    return WithPending;
  };
}
