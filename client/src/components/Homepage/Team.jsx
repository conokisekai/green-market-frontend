import React from "react";

export const Team = (props) => {
  return (
    <div id="team" className="py-8">
      <div className=" mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Meet the Team</h2>
          <p className="text-gray-600">The team that built this project</p>
        </div>
        <div className="flex flex-wrap justify-center -mx-4">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-4 mb-8">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <img src={d.img} alt={d.name} className="w-full mb-4 rounded" />
                    <h4 className="text-lg font-semibold">{d.name}</h4>
                    <p className="text-sm text-gray-600">{d.job}</p>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
