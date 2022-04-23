import React, { useEffect, useState } from "react"
import LoadBE from "../Helpers/LoadBE"
import Search from "./Search"
import { HomeIcon, PlusIcon } from "@radix-ui/react-icons"
import Modal from "./Modal"

function Classes() {
  useEffect(() => {
    loadClasses()
  }, [])
  const [classes, setClasses] = useState([])
  const [search, setSearch] = useState("")
  const [add, setAdd] = useState(false)

  async function loadClasses() {
    let { errors, data } = await LoadBE(`{
        classes{
            label
            level
            students{
                admissionNumber
                name
            }
        }
    }`)
    if (errors) {
    } else {
      setClasses(data.classes)
    }
  }

  return (
    <div className="students">
      <div className="title">Classes</div>
      <div className="options">
        <Search placeholder="Find Class" setText={e => setSearch(e)} />
        <div className="option" onClick={() => setAdd(true)}>
          <PlusIcon />
          <span>Add a Class</span>
        </div>
      </div>
      <Modal title="Add a Class" shown={add} hide={() => setAdd(false)}></Modal>
      <div className="list">
        {classes
          .filter(
            ({ level, label }) =>
              level.toString().includes(search) ||
              label.toLowerCase().includes(search)
          )
          .map(({ level, label, students }) => (
            <div className="student">
              <div className="adm">{level}</div>
              <HomeIcon
                style={{
                  transform: "scale(4)",
                  margin: 20,
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              />
              <div
                className="name"
                style={{ alignSelf: "center", justifySelf: "center" }}
              >
                {label}
              </div>
              <div
                className="details"
                title={students.map(s => ` ${s.name.toUpperCase()}`)}
                style={{
                  fontSize: "small",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
              >
                {students.length.toLocaleString()} Students
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Classes
