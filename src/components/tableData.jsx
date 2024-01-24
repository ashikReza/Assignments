/* eslint-disable react/prop-types */
import React from "react";

// Function to generate student row
const StudentRow = ({ id, image, name, grade, percentage }) => {
  return (
    <tr key={id} className="border-b border-[#7ECEB529]">
      <td className="p-5 text-sm md:text-xl">{id}</td>
      <td className="p-5 text-sm md:text-xl">
        <div className="flex space-x-3 items-center">
          <img
            className="w-8 h-8 rounded-full"
            src={image}
            width="32"
            height="32"
            alt={name}
          />
          <span className="whitespace-nowrap">{name}</span>
        </div>
      </td>
      <td className="p-5 text-sm md:text-xl text-center">{grade}</td>
      <td className="p-5 text-sm md:text-xl text-center">{`${percentage}%`}</td>
    </tr>
  );
};

// Function to generate class section
const ClassSection = ({ className, students }) => {
  return (
    <React.Fragment key={className}>
      <tr className="bg-white/5">
        <td className="p-5 text-sm md:text-xl" colSpan="4">
          {className}
        </td>
      </tr>
      {students.map((student) => (
        <StudentRow key={student.id} {...student} />
      ))}
    </React.Fragment>
  );
};

const StudentTableData = ({ jsonData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#FFFFFF0D]">
          <th className="uppercase p-5 text-sm md:text-xl font-semibold md:min-w-[110px] text-left">
            ID
          </th>
          <th className="p-5 text-sm md:text-xl font-semibold text-left">
            Name
          </th>
          <th className="p-5 text-sm md:text-xl font-semibold">Scores</th>
          <th className="p-5 text-sm md:text-xl font-semibold">Percentage</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(jsonData).map(([className, students]) => (
          <ClassSection
            key={className}
            className={className}
            students={students}
          />
        ))}
      </tbody>
    </table>
  );
};

export default StudentTableData;
