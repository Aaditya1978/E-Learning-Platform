import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Table } from "react-bootstrap";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./Compete.css";

export default function Compete() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [key, setKey] = useState("all");
  const [contestData, setContestData] = useState([]);

  const siteLists = [
    "CodeForces",
    "TopCoder",
    "LeetCode",
    "CodeChef",
    "HackerRank",
    "HackerEarth",
    "Kick Start",
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetch(`${process.env.REACT_APP_BASE_URL}/api/user/verifyToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.user) {
            localStorage.removeItem("token");
            navigate("/");
          } else {
            setName(data.user.name);
          }
        });
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/contests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setContestData(data.contests);
      });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate]);

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          {/* main heading */}
          <div className="compete container">
            <h2>Hello {name}</h2>

            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
            >
              <Tab eventKey="all" title="All Contest">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Site</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contestData.map((contest, index) => (
                      <tr key={index}>
                        <td>
                          <a
                            href={contest.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contest.name}
                          </a>
                        </td>
                        <td>{contest.site}</td>
                        <td>
                          {new Date(contest.start_time).toLocaleDateString()}{" "}
                          {new Date(contest.start_time).toLocaleTimeString()}
                        </td>
                        <td>
                          {new Date(contest.start_time).toLocaleDateString()}{" "}
                          {new Date(contest.start_time).toLocaleTimeString()}
                        </td>
                        <td>
                          {contest.duration / 60 / 60 > 24
                            ? `${Math.floor(
                                contest.duration / 60 / 60 / 24
                              )} days`
                            : contest.duration / 60 / 60 > 1
                            ? `${Math.floor(contest.duration / 60 / 60)} hours`
                            : `${Math.floor(contest.duration / 60)} minutes`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
              {siteLists.map((site, index) => (
                <Tab eventKey={site} title={site} key={index}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Site</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contestData.map((contest, index) => {
                        if (contest.site === site) {
                          return (
                            <tr key={index}>
                              <td>
                                <a
                                  href={contest.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {contest.name}
                                </a>
                              </td>
                              <td>{contest.site}</td>
                              <td>
                                {new Date(
                                  contest.start_time
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  contest.start_time
                                ).toLocaleTimeString()}
                              </td>
                              <td>
                                {new Date(
                                  contest.start_time
                                ).toLocaleDateString()}{" "}
                                {new Date(
                                  contest.start_time
                                ).toLocaleTimeString()}
                              </td>
                              <td>
                                {contest.duration / 60 / 60 > 24
                                  ? `${Math.floor(
                                      contest.duration / 60 / 60 / 24
                                    )} days`
                                  : contest.duration / 60 / 60 > 1
                                  ? `${Math.floor(
                                      contest.duration / 60 / 60
                                    )} hours`
                                  : `${Math.floor(
                                      contest.duration / 60
                                    )} minutes`}
                              </td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </Table>
                </Tab>
              ))}
            </Tabs>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
