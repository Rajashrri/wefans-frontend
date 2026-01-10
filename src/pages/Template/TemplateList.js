import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, CardBody, Table, Button } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getSectionData } from "../../api/TemplateApi";

const SectionTemplateList = () => {
  const { celebId, id } = useParams(); // id = SectionMaster ID
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await getSectionData(celebId, id);

        if (res.success) {
          setSection(res);
        } else {
          console.error(res.msg);
        }
      } catch (err) {
        console.error("Error fetching section:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSection();
  }, [celebId, id]);

  if (loading) return <p>Loading section...</p>;
  if (!section) return <p>Section not found!</p>;

  const { sectionName, fields, data } = section;

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Section Template List"
          breadcrumbItems={[
            { title: "Dashboard", link: "/" },
            { title: "Section Templates", link: "#" },
          ]}
        />

        {/* Section Fields Table */}
        <Card className="mb-4">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Section: {sectionName}</h4>
              <Link
                to={`/section-template-view/${celebId}/${id}`}
                className="btn btn-primary btn-sm"
              >
                ADD
              </Link>
            </div>

           <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>No.</th>
                  {fields.map((f) => (
                    <th key={f._id}>{f.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={row._id}>
                      <td>{index + 1}</td>
                      {fields.map((f) => {
                        const value = row[f.title];

                        // Handle Multiple Select fields
                        if (f.type === "Multiple Select" && Array.isArray(value)) {
                          return (
                            <td key={f._id}>
                              {value.join(", ")}
                            </td>
                          );
                        }

                        // Handle Single Select (assume value is the option _id)
                        if (f.type === "Single Select" && f.options && f.options.length) {
                          const option = f.options.find((o) => o._id === value);
                          return <td key={f._id}>{option ? option.label : ""}</td>;
                        }

                        return <td key={f._id}>{value}</td>;
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={fields.length + 1} className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>

      
      </Container>
    </div>
  );
};

export default SectionTemplateList;
