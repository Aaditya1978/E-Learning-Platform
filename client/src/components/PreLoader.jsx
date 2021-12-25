import React from "react";
import { TraceSpinner } from "react-spinners-kit";
import "./PreLoader.css";

export default function PreLoader() {
    return (
        <div className="pre-loader">
          <TraceSpinner size={110} />
        </div>
    );
}