import React from "react";
import ReactDOM from "react-dom";

import Sidebar from "../..";
import MaterialTitlePanel from "./material_title_panel";
import SidebarContent from "./sidebar_content";

const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
    };

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.contentElement.addEventListener('scroll', this.handleScroll);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  handleScroll(e) {
    console.log(this.state);
    console.log('go here: ', e.target.scrollTop)
  }

  renderPropCheckbox(prop) {
    const toggleMethod = ev => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <label htmlFor={prop}>
          <input
            type="checkbox"
            onChange={toggleMethod}
            checked={this.state[prop]}
            id={prop}
          />
          {prop}
        </label>
      </p>
    );
  }

  renderPropNumber(prop) {
    const setMethod = ev => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
        {prop}{" "}
        <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>
    );
  }

  render() {
    const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            =
          </a>
        )}
        <span> React Sidebar</span>
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
      contentRef: React.createRef(),
    };

    return (
      <Sidebar {...sidebarProps} contentRef={el => this.contentElement = el}>
        <MaterialTitlePanel title={contentHeader}>
          <div style={styles.content}>
            <p>
              React Sidebar is a sidebar component for React. It offers the
              following features:
            </p>
            <ul>
              <li>Have the sidebar slide over main content</li>
              <li>Dock the sidebar next to the content</li>
              <li>Touch enabled: swipe to open and close the sidebar</li>
              <li>
                Easy to combine with media queries for auto-docking (
                <a href="responsive_example.html">see example</a>)
              </li>
              <li>
                Sidebar and content passed in as PORCs (Plain Old React
                Components)
              </li>
              <li>
                <a href="https://github.com/balloob/react-sidebar">
                  Source on GitHub
                </a>{" "}
                (MIT license)
              </li>
              <li>Only dependency is React</li>
            </ul>
            <p>
              <a href="https://github.com/balloob/react-sidebar#installation">
                Instructions how to get started.
              </a>
            </p>
            <p>
              <b>Current rendered sidebar properties:</b>
            </p>
            {[
              "open",
              "docked",
              "transitions",
              "touch",
              "shadow",
              "pullRight"
            ].map(this.renderPropCheckbox)}
            {["touchHandleWidth", "dragToggleDistance"].map(
              this.renderPropNumber
            )}
          </div>
        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("example"));
