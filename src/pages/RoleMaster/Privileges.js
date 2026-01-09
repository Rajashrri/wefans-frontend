import React, { useMemo, Fragment, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Container,
  Table,
  Row,
  Col,
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import deleteimg from "../../assets/images/delete.png";

// Global Search Component
function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Col md={4}>
      <Input
        type="text"
        className="form-control"
        placeholder={`Search ${count} records...`}
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Col>
  );
}

function Filter() {
  return null;
}

// Table Container Component
const TableContainer = ({
  columns,
  data,
  customPageSize,
  className,
  isGlobalFilter,
  setModalOpen,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter },
      initialState: { pageIndex: 0, pageSize: customPageSize },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={2}>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
      </Row>

      <div className="table-responsive react-table">
        <Table bordered hover {...getTableProps()} className={className}>
          <thead className="table-light table-nowrap">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row className="justify-content-md-end justify-content-center align-items-center mt-3">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </Button>
            <Button color="primary" onClick={previousPage} disabled={!canPreviousPage}>
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            max={pageOptions.length}
            style={{ width: 70 }}
            value={pageIndex + 1}
            onChange={(e) => gotoPage(Number(e.target.value) - 1)}
          />
        </Col>
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button color="primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {">>"}
            </Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

TableContainer.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  customPageSize: PropTypes.number,
  className: PropTypes.string,
  isGlobalFilter: PropTypes.bool,
  setModalOpen: PropTypes.func.isRequired,
};

// Main Privileges Component
const Privileges = () => {
  const { id } = useParams();

  const [projectData, setprojectData] = useState([
    { id: 1, projectName: "Profession Master", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 2, projectName: "Language Master", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 3, projectName: "Trivia Types", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 4, projectName: "Social Links", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 5, projectName: "Genre Master", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 6, projectName: "Celebrity", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 7, projectName: "Section Types Master", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
    { id: 8, projectName: "Section Template", projectstatus: "Inactive", add: "Inactive", edit: "Inactive", delete: "Inactive", list: "Inactive" },
  ]);

  const [masterChecked, setMasterChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);

  // Toggle individual privilege
  const handleToggle = (id, field) => {
    setprojectData(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, [field]: item[field] === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  };

  // Master toggle for all modules
  const handleMasterCheckboxToggle = () => {
    const newStatus = !masterChecked;
    setMasterChecked(newStatus);

    setprojectData(prevData =>
      prevData.map(item => ({
        ...item,
        projectstatus: newStatus ? "Active" : "Inactive",
        add: newStatus ? "Active" : "Inactive",
        edit: newStatus ? "Active" : "Inactive",
        delete: newStatus ? "Active" : "Inactive",
        list: newStatus ? "Active" : "Inactive",
      }))
    );
  };

  // Toggle entire row
  const handleCheckboxToggle = (id) => {
    setprojectData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {
              ...item,
              projectstatus: item.projectstatus === "Active" ? "Inactive" : "Active",
              add: item.projectstatus === "Active" ? "Inactive" : "Active",
              edit: item.projectstatus === "Active" ? "Inactive" : "Active",
              delete: item.projectstatus === "Active" ? "Inactive" : "Active",
              list: item.projectstatus === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  // Fetch privileges from backend
  const fetchPrivileges = async () => {
    if (!id) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/privileges/getPriByid/${id}`);
      const res_data = await response.json();
      if (response.ok) {
        const packageData = res_data.msg?.[0] || {};
        const updatedData = projectData.map(item => {
          const key = item.projectName.replace(/\s+/g, "").toLowerCase(); // simple mapping
          return {
            ...item,
            projectstatus:
              packageData[`${key}add`] === "1" ||
              packageData[`${key}update`] === "1" ||
              packageData[`${key}delete`] === "1" ||
              packageData[`${key}list`] === "1"
                ? "Active"
                : "Inactive",
            add: packageData[`${key}add`] === "1" ? "Active" : "Inactive",
            edit: packageData[`${key}update`] === "1" ? "Active" : "Inactive",
            delete: packageData[`${key}delete`] === "1" ? "Active" : "Inactive",
            list: packageData[`${key}list`] === "1" ? "Active" : "Inactive",
          };
        });
        setprojectData(updatedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchPrivileges();
  }, [id]);

  useEffect(() => {
    const allChecked = projectData.every(
      item => item.projectstatus === "Active" && item.add === "Active" && item.edit === "Active" && item.delete === "Active" && item.list === "Active"
    );
    setMasterChecked(allChecked);
  }, [projectData]);

  // Table Columns
  const columns = useMemo(() => [
    { Header: "No.", accessor: (_row, i) => i + 1 },
    {
      Header: () => (
        <div className="form-check form-check-right">
          <Input
            type="checkbox"
            className="form-check-input"
            checked={masterChecked}
            onChange={handleMasterCheckboxToggle}
          />
          <Label className="form-check-label">Module Name</Label>
        </div>
      ),
      accessor: "projectName",
      Cell: ({ value, row }) => {
        const { id } = row.original;
        return (
          <div className="form-check mb-3">
            <Input
              className="form-check-input"
              type="checkbox"
              checked={row.original.add === "Active" && row.original.edit === "Active" && row.original.delete === "Active" && row.original.list === "Active"}
              onChange={() => handleCheckboxToggle(id)}
            />
            <Label className="form-check-label">{value}</Label>
          </div>
        );
      },
    },
    ...["add", "edit", "delete", "list"].map(field => ({
      Header: field.charAt(0).toUpperCase() + field.slice(1),
      accessor: field,
      Cell: ({ row }) => {
        const isActive = row.original[field] === "Active";
        return (
          <div className="form-check form-switch">
            <Input
              type="checkbox"
              className="form-check-input"
              checked={isActive}
              onChange={() => handleToggle(row.original.id, field)}
            />
            <Label className="form-check-label">{isActive ? "Active" : "Inactive"}</Label>
          </div>
        );
      },
    })),
  ], [projectData, masterChecked]);

  // Update privileges
  const updatePrivileges = async () => {
    if (!id || !projectData.length) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/privileges/setprivileges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });
      if (response.ok) {
        toast.success("Updated Successfully");
        fetchPrivileges();
      } else {
        console.error("Failed to update privileges:", response.status);
      }
    } catch (error) {
      console.error("Error updating privileges:", error);
    }
  };

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Privileges", link: "#" },
  ];

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Privileges" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <TableContainer
                columns={columns}
                data={projectData}
                customPageSize={10}
                isGlobalFilter={true}
                setModalOpen={setModalOpen}
              />
              <Col md={6}>
                <div className="d-flex justify-content-end">
                  <Button color="primary" onClick={updatePrivileges}>Update</Button>
                </div>
              </Col>
            </CardBody>
          </Card>
        </Container>

        {/* Delete Modal */}
        <Modal isOpen={modalOpen2} toggle={() => setModalOpen2(!modalOpen2)}>
          <ModalBody className="mt-3 text-center">
            <h4>Do you really want to delete the file?</h4>
            <img src={deleteimg} alt="Delete" width="70%" className="mb-3 m-auto" />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => setModalOpen2(false)}>Delete</Button>
            <Button color="secondary" onClick={() => setModalOpen2(false)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

export default Privileges;
