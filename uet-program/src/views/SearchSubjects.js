import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { request, setAuthHeader } from '../helpers/axios_helper';
import * as XLSX from "xlsx";

export default function SearchSubjects() {
  // const [searchTermId, setSearchTermId] = useState('');
  // const [searchTermProgram, setSearchTermProgram] = useState('');
  const [status, setStatus] = useState('');
  const [student, setStudent] = useState('');
  const [roleTypeList, setRoleTypeList] = useState([]);
  const [roleType, setRoleType] = useState('');
  const [subjectList, setSubjectList] = useState([]);
  const {id} = useParams();
  const {id2} = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [exportInfo, setExportInfo] = useState([]);

  useEffect(() => {

    request(
        "GET",
        'programsubjects/new',
        {}).then(
        (response) => {
          console.log(response.data)
          setRoleTypeList(response.data.listRoleType)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );

    request(
        "GET",
        `searchSubject/${id}/${id2}`,
        {}).then(
        (response) => {
          console.log(response.data)
          setSubjectList(response.data)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  },[])

  const handleShowModal = (content) => {
    request(
      "GET",
      `subjects/edit/${content}`,
      {}).then(
      (response) => {
        setModalContent({...modalContent, subjectName: response.data.subjectName, credit: response.data.credit});
      }).catch(
      (error) => {
          if (error.response.status === 401) {
              // setAuthHeader(null);
          } else {
              this.setState({data: error.response.code})
          }
      }
    );
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    request(
        "GET",
        `searchSubject/${id}/${id2}?status=${status}&roleType=${roleType}`,
        {}).then(
        (response) => {
          console.log(response.data)
          const extractedData = response.data.map(item => ({
            SubjectName: item.subjectName,
            Credit: item.credit,
            RoleType: item.roleType,
            Mark: item.mark
          }));
          setSubjectList(response.data)
          setExportInfo(extractedData)
        }).catch(
        (error) => {
            if (error.response.status === 401) {
                // setAuthHeader(null);
            } else {
                this.setState({data: error.response.code})
            }
        }
      );
  };

  const groupedSubjects = {};
    subjectList.forEach(subject => {
      if (!groupedSubjects[subject.roleType]) {
        groupedSubjects[subject.roleType] = [];
      }
      groupedSubjects[subject.roleType].push(subject);
    });

    const handleExport = () => {
      var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(exportInfo);
      console.log(exportInfo)

      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");

      XLSX.writeFile(wb, "Marks.xlsx");
    }


  return (
    <div className="container pt-5">
    <br></br>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Status:</label>
            <Select 
                name="status"
                options={[{value: "finished", label: "finished"},{value: "unfinished", label: "unfinished"}]}
                placeholder='None Selected'
                onChange={e => setStatus(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
        <div className="form-group">
            <label>Role Type:</label>
            <Select 
                name="roleType"
                options={roleTypeList.map(t=>({value: t, label: t}))}
                placeholder='None Selected'
                onChange={e => setRoleType(e.value)}
                className="form-control"
            >
            </Select><br></br>
        </div>
      <br></br>
      <button type="submit" className='btn btn-primary'>Search</button>
      <br></br>
    </form>
      <table className="table table-hover">
        </table>
        <br></br>
            <h1 className="text-center">Program Subjects</h1>
            {Object.keys(groupedSubjects).map(roleType => (
            <div key={roleType}>
            <h2>{roleType}</h2>
            <table className="table table-hover table-info">
              <thead>
                <tr className='table-primary'>
                  <th scope="col" style={{ width: '600px' }}>SubjectName</th>
                  <th scope="col" style={{ width: '150px' }}>Credit</th>
                  { 
                    subjectList[0].mark != null
                    ? <th scope="col">Mark</th> : <th scope="col">Prerequisite Subject</th>
                  }
                </tr>
              </thead >
              <tbody>
              {groupedSubjects[roleType].map((subject, idx) => (
                <tr key={idx}>
                  <th scope="row">{subject.subjectName}</th>
                  <td>{subject.credit}</td>
                  <td>
                    {
                      subject.mark!=null ? subject.mark : 
                      subject.prerequisiteSubjectId.map((e, index) => (
                        <Button key={index} variant="link" onClick={() => handleShowModal(`${e}`)}>
                          {e}
                        </Button>
                      ))
                    }
                  
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            </div>
            ))}
          <button type="button" class="btn btn-primary" onClick={handleExport} >Export</button><br></br><br></br>
          <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          <Modal.Title>Prerequisite Subject Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <p>Subject Name: {modalContent.subjectName}</p>
            <p>Credit: {modalContent.credit}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          </Modal.Footer>
          </Modal>
    </div>
    
  )
}


