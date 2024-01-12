import React from "react";
import '../styles/Tabs.css'
import Tab from "./UI/tab";

export default function Tabs({openCompletedTasks}) {
    return (
        <div className="tabs">
            <ul>
                <Tab onClick={openCompletedTasks}>Show completed tasks</Tab>
            </ul>
        </div>
    )
}