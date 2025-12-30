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
  useExpanded,
  usePagination,
} from "react-table";
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import deleteimg from "../../assets/images/delete.png";
import { toast } from "react-toastify";
import { getMoviesByCelebrity, deleteMoviev } from "../../api/movievApi";

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

const TableContainer = ({
  columns,
  data,
  customPageSize,
  className,
  isGlobalFilter,
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
    useExpanded,
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
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
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
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
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
};

const MovievList = () => {
 const { id } = useParams();
const celebrityId = id; // rename for clarity

  const [modalOpen2, setModalOpen2] = useState(false);
  const [movies, setMovies] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMovies = async () => {
    try {
      const result = await getMoviesByCelebrity(celebrityId);
      setMovies(result.msg || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("Failed to load movies.");
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalOpen2(true);
  };

  const handleClose = () => {
    setModalOpen2(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      const result = await deleteMoviev(deleteId);
      if (result.status) {
        toast.success("Movie deleted successfully!");
        setMovies((prev) => prev.filter((m) => m._id !== deleteId));
        setModalOpen2(false);
      } else {
        toast.error(result.msg || "Failed to delete movie.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [celebrityId]);

  const columns = useMemo(
    () => [
      { Header: "No.", accessor: (_row, i) => i + 1 },
      { Header: "Title", accessor: "title" },
     
      {
        Header: "Options",
        Cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Link
              to={`/update-movie/${row.original._id}`}
              className="btn btn-primary btn-sm"
            >
              Edit
            </Link>
            <Button
              color="danger"
              size="sm"
              onClick={() => handleDelete(row.original._id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [movies]
  );

  const breadcrumbItems = [
    { title: "Dashboard", link: "/" },
    { title: "Movies", link: "#" },
  ];

  return (
    <Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Movies" breadcrumbItems={breadcrumbItems} />
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between mb-3">
                <h4 className="mb-0">Movies List</h4>
                <Link
                  to={`/add-movie/${id}`}
                  className="btn btn-primary"
                >
                  + Add Movie
                </Link>
              </div>

              <TableContainer
                columns={columns}
                data={movies}
                customPageSize={10}
                isGlobalFilter={true}
              />
            </CardBody>
          </Card>
        </Container>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={modalOpen2} toggle={handleClose}>
          <ModalBody className="mt-3">
            <h4 className="p-3 text-center">
              Do you really want to delete this movie?
            </h4>
            <div className="d-flex justify-content-center">
              <img
                src={deleteimg}
                alt="Delete Icon"
                width={"70%"}
                className="mb-3 m-auto"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Fragment>
  );
};

export default MovievList;
