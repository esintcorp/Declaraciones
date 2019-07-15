import React, { Component } from "react";

class IvaTable extends Component {
  render() {
    const { titles, data, filter } = this.props,
      filteredTitles =
        titles && titles.filter(item => item.billType.id === filter);

    return (
      <React.Fragment>
        <div className="table-title">{filter === 1 ? "Compras" : "Ventas"}</div>
        <div className="iva-list-table">
          {filteredTitles.map((item, index) => {
            let titleClassName = "iva-title";

            if (filteredTitles.length - 1 === index) {
              titleClassName = titleClassName + " last-cell";
            }

            return (
              <div key={item.id}>
                <div className={titleClassName}>{item.name}</div>
                <div className="iva-answer">
                  {data
                    .filter(dataItem => dataItem.id === item.id)
                    .map(dataItem => {
                      let cellClassName = "iva-answer-cell";

                      let itemValue = dataItem.value;
                      if (dataItem.type === "double") {
                        itemValue = new Intl.NumberFormat("es-EC", {
                          style: "currency",
                          currency: "USD"
                        }).format(dataItem.value || 0);
                        cellClassName = cellClassName + " cell-number";
                      } else if (dataItem.type === "percentage") {
                        itemValue = new Intl.NumberFormat("es-EC", {
                          style: "percent"
                        }).format(dataItem.value / 100 || 0);
                        cellClassName = cellClassName + " cell-number";
                      } else if (dataItem.type === "date") {
                        itemValue = new Intl.DateTimeFormat("es", {
                          // weekday: 'long',
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        }).format(new Date(dataItem.value + "T00:00:00" || 0));
                      }

                      if (filteredTitles.length - 1 === index) {
                        cellClassName = cellClassName + " last-cell";
                      }

                      return (
                        <div
                          className={cellClassName}
                          key={dataItem.billId + dataItem.id}
                        >
                          {itemValue}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default IvaTable;
