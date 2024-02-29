import React from "react";

export const Services = (props) => {
  if (!props.data || !Array.isArray(props.data)) {
    return <div>No data available</div>;
  }

  // Split the data into two arrays, each containing three items
  const firstRowData = props.data.slice(0, 3);
  const secondRowData = props.data.slice(3, 6);

  return (
    <div id="services" className="text-center">
      <div className="container-s">
        <div className="section-title">
          <h2>Our Products</h2>
        </div>
        <div className="row">
          {/* Render the first row */}
          {firstRowData.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              <img src={d.image_link} alt={d.name} />
              <div className="service-desc">
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {/* Render the second row */}
          {secondRowData.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              <img src={d.image_link} alt={d.name} />
              <div className="service-desc">
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
