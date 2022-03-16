import React from "react";
import { useHistory } from "react-router-dom";

const ContentDetails = ({ item }) => {
  const history = useHistory();
  return (
    <>
      <tr className="align-right text-dark">
        <th className=" px-4 text-capitalize " scope="row">
          {item?.user?.firstname} {item?.user?.lastname}
        </th>
        <td className="px-4">{item?.title}</td>
        <td className="px-4">{item?.note}</td>
        <td className="px-4">Rs.{item?.amount}</td>
        <td className="">
          {item?.date.substring(0,10)}
        </td>
      </tr>
    </>
  );
};
export default ContentDetails;