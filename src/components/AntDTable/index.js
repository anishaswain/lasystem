import { Tag, Table } from "antd";
import PropTypes from "prop-types";

function AntDTable(props) {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        const color = text === "approved" ? "green" : "red";
        return (
          <Tag
            color={color}
            key={text}
            onClick={() => props.action(props.id, record)}
          >
            {text}
          </Tag>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={props.data} />;
}

AntDTable.propTypes = {
  action: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

export default AntDTable;
