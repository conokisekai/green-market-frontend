import React from "react";
import './services.css';

export const Testimonials = (props) => {
  if (!props.data || !Array.isArray(props.data)) {
    return <div>No data available</div>;
  }

  const rowData = props.data.slice(0, 6);

  return (
    <div className="services-container" style={{ marginLeft: "10px" }}>
      <div id="service" className="service" style={{ marginLeft: "-1cm", maxWidth:"1760px" }}>
        <div className="container-s">
          <div className="section-title">
            <h2>Farm Articles</h2>
          </div>
          <div className="row justify-content-center">
            {rowData.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-3 d-flex justify-content-center" style={{ padding: "10px" }}> {/* Add padding */}
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
