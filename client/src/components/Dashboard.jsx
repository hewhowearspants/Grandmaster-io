import React, { Component } from "react";
import axios from "axios";

import { DashboardNav } from "./Dashboard-Nav";
import { DashboardContents } from "./Dashboard-Contents";

class Dashboard extends Component {
  state = { leaderInfo: null };

  // state stored for leaderboard component
  async componentDidMount() {
    try {
      const res = await axios.get("/user/leaderboard");
      
      this.setState({
        leaderInfo: res.data.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  // the container component for the user dashboard. lots and lots of props from App.js
  render = () => (
    <div className="dashboard">
      <DashboardNav {...this.props} />
      <DashboardContents {...this.props} leaderInfo={this.state.leaderInfo} />
    </div>
  );
}

export default Dashboard;
