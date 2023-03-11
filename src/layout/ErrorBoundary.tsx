// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <div style={errorStyle}>An error has occurred.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const errorStyle: React.CSSProperties = {
  color: "var(--theme-text-secondary)",
  textAlign: "center",
  alignSelf: "center",
  fontSize: "0.8em",
  fontStyle: "italic",
};
