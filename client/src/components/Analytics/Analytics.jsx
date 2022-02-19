import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Form } from "react-bootstrap";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import TableauReport from "tableau-react";
import PreLoader from "../PreLoader/PreLoader";
import UserNavBar from "../UserNavBar/UserNavBar";
import Footer from "../Footer/Footer";
import "./Analytics.css";

export default function Analytics() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [barData, setBarData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [year, setYear] = useState("2022");
  const [userCourse, setUserCourse] = useState([]);

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
    fetch(`${process.env.REACT_APP_BASE_URL}/api/user/getUserData`, {
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
        setUserCourse(data.userCourses);
        data.userCourses.map((course) => {
          if (course.completed === true) {
            const date = new Date(course.date_completed);
            const yea = date.getFullYear();
            const month = date.getMonth();
            if (yea === parseInt(year)) {
              setBarData((prevState) => {
                const newArray = [...prevState];
                newArray[month] += 1;
                return newArray;
              });
            }
          }
          return null;
        });
      });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [navigate, year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    userCourse.map((course) => {
      if (course.completed === true) {
        const date = new Date(course.date_completed);
        const yea = date.getFullYear();
        const month = date.getMonth();
        if (yea === parseInt(year)) {
          setBarData((prevState) => {
            const newArray = [...prevState];
            newArray[month] += 1;
            return newArray;
          });
        }
      }
      return null;
    });
  };

  const BarData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Courses Done",
        data: barData,
        fill: false,
        backgroundColor: "#178D4A",
        borderColor: "#178D4A",
      },
    ],
  };

  const options = {
    height: "45rem",
    width: "100%",
    hideTabs: false,
  };

  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
          {/* Navbar compnent */}
          <UserNavBar />

          {/* main heading */}
          <div className="analytics container">
            <h2>Hello {name}</h2>
            <h6 className="sub-head">What's up going on !!</h6>

            {/* alaytics section */}
            <div className="analytics-main container">
              <Row className="bar-chart">
                <Form.Label>Select Year</Form.Label>
                <Form.Select
                  value={year}
                  onChange={(e) => {
                    handleYearChange(e);
                  }}
                >
                  {userCourse.map((course) => {
                    if (course.completed === true) {
                      const date = new Date(course.date_completed);
                      const yea = date.getFullYear();
                      return <option value={yea}>{yea}</option>;
                    }
                    return null;
                  })}
                </Form.Select>
                <h1 className="main-heading">Courses Done in Year {year}</h1>
                <Bar
                  data={BarData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Row>

              <Row className="tableau">
                <h1 className="main-heading">Various Programming languages Popularity</h1>
                <TableauReport
                  url="https://public.tableau.com/views/ProgrammingLanguagesPopularity2004-2021/Dashboard1"
                  options={options}
                />
              </Row>
            </div>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}
