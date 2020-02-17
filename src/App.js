// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";
import SelectList from "./components/SelectList/SelectList";
import { monthsArr } from "./assets/Data";
import { appendLeadingZeroes, consoleLog } from "./assets/Helpers";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  state = {
    month: 1,
    months: []
  };

  componentDidMount = () => {
    consoleLog("[App] componentDidMount()");
    this.setState({ months: monthsArr });
  };

  handleFilterChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    consoleLog("[App.js] handleFilterChange > " + name + " = " + value);
    this.setState({
      [name]: value
    });
    this.getMonthFilter();
  };

  getMonthFilter() {
    const activeMonth = appendLeadingZeroes(this.state.month);
    consoleLog("[App] getMonthFilter() > activeMonth = " + activeMonth);

    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute
        },
        from: `2016-${activeMonth}-01`,
        to: `2016-${activeMonth}-31`
      }
    };
  }

  getMeasures() {
    return [
      {
        measure: {
          localIdentifier: "m1",
          definition: {
            measureDefinition: {
              item: {
                uri: grossProfitMeasure
              }
            }
          },
          alias: "$ Gross Profit"
        }
      }
    ];
  }

  getViewBy() {
    return {
      visualizationAttribute: {
        displayForm: {
          uri: dateAttributeInMonths
        },
        localIdentifier: "a1"
      }
    };
  }

  renderDropdown(getObject) {
    return getObject ? (
      <SelectList
        name={getObject.name}
        selected={getObject.selected}
        optionsArr={getObject.optionsArr}
        changed={this.handleFilterChange}
      />
    ) : null;
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    const { month, months } = this.state;

    // SELECT month object
    const monthObj = {
      name: "month",
      selected: month,
      optionsArr: months.slice(0)
    };
    // (END) SELECT month

    return (
      <div className="App">
        <h1>$ Gross Profit in month {this.renderDropdown(monthObj)} 2016</h1>
        <div>
          <ColumnChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>
        <h1>$ Gross Profit - All months</h1>
        <div>
          <ColumnChart
            measures={measures}
            viewBy={viewBy}
            projectId={projectId}
          />
        </div>
      </div>
    );
  }
}

export default App;
