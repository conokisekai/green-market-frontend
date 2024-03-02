import React from "react";
import './services.css';

export const Services = (props) => {
  if (!props.data || !Array.isArray(props.data)) {
    return <div>No data available</div>;
  }

  const rowData = props.data.slice(0, 6);

  return (
    <div id="products" className="services-container" >
      <div id="service" className="service" style={{ marginLeft: "-5cm", maxWidth:"1800px" }}>
        <div className="container-s">
          <div className="section-title">
            <h2>Our Products</h2>
          </div>
          <div className="row justify-content-center" style={{ paddingLeft: "5cm" }}>
            {rowData.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-2 d-flex justify-content-center" style={{ paddingRight: "20px" }}> {/* Add padding */}
                <img src={d.image_link} alt={d.name} style={{ maxWidth: '100%', height: '60%'}} />
                <div className="service-desc">
                  <h3>{d.name}</h3>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
