//React´s Components
import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
//React Bootstrap
import { Table, Spinner, Modal } from "react-bootstrap";
//Interfaces
import { ITournament } from "../../interfaces";
//Redux
import { IGlobalState } from "../../reducers/reducers";
import { connect } from "react-redux";
//Styled Components - CSSINJS
import styled from "styled-components";

// ********* Styles - Styled Components - CSSINJS **********
const Wrapper = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  margin-top: 120px;
  margin-bottom: 80px;
`;
const TableHead = styled.thead`
  font-family: "Roboto", sans-serif;
`;
const Title = styled.span`
  font-size: 2.3em;
  font-family: "Source Sans Pro", sans-serif;
  color: #bdbdbd;
  text-transform: uppercase;
`;

//----------------------------------------------------

//Global Props
interface IProps { }
interface IPropsGlobal {
  allleagues: ITournament[];
}



const AllLeaguesList: React.FC<RouteComponentProps & IProps & IPropsGlobal> = props => {
  const [spinner, setSpinner] = useState(false);
  const toggleSpinner = React.useCallback(() => setSpinner(s => !s), []);

  const compareNameAdmin = (a: any, b: any) => {
    if (a.NameAdmin < b.NameAdmin) {
      return -1;
    }
    if (a.NameAdmin > b.NameAdmin) {
      return 1;
    }
    return 0;
  };
  const compareNameAdminReverse = (a: any, b: any) => {
    if (a.NameAdmin > b.NameAdmin) {
      return -1;
    }
    if (a.NameAdmin < b.NameAdmin) {
      return 1;
    }
    return 0;
  };

  const [sortByNameAdmin, setSortByNameAdmin] = React.useState(false);
  const toggleSortByNameAdmin = React.useCallback(
    () => setSortByNameAdmin(s => !s),
    []
  );

  if (sortByNameAdmin) {
    props.allleagues.sort(compareNameAdmin);
  } else {
    props.allleagues.sort(compareNameAdminReverse);
  }

  return (
    <>
      <Wrapper className="container-fluid">
        <div className="row mt-4 justify-content-center">
          <div className="col-10">
            <Title>Ligas:</Title>
          </div>
        </div>
        <div className="row mt-1 justify-content-center">
          <div className="col-10 p-3 text-center">
            <Table
              responsive="md"
              variant="dark"
              striped
              hover
              className=" border border-secondary"
            >
              <TableHead>
                <tr>
                  <th />
                  <th />
                  <th>
                    ADMINISTRADOR
                  <img
                      src="/images/other/sort.png"
                      className="ml-2 mb-1"
                      width="15"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleSortByNameAdmin()}
                      alt=""
                    />
                  </th>
                  <th>DEPORTE</th>
                  <th>MODALIDAD</th>
                  <th>Nº EQUIPOS</th>
                  <th>FECHA CREACIÓN</th>
                </tr>
              </TableHead>
              <tbody>
                {props.allleagues.map(l => (
                  <tr key={l.TournamentId}>
                    <td className="p-1 align-middle">{l.TournamentId}</td>
                    <td className="text-warning p-0 align-middle"
                      style={{ cursor: 'pointer' }}
                      onClick={() => (
                        toggleSpinner(),
                        setTimeout(() => toggleSpinner(), 1000),
                        setTimeout(() => props.history.push("/leagues/allleaguesDetails/" + l.TournamentId), 1000)
                      )}
                    >
                      {l.name}
                    </td>
                    <td className="p-1 align-middle">{l.NameAdmin}</td>
                    <td className="p-1 align-middle">{l.sport}</td>
                    <td className="p-1 align-middle">{l.category}</td>
                    <td className="p-1 align-middle">
                      <div className="row">
                        <div className="col text-center">{l.NTeams}</div>
                      </div>
                    </td>
                    <td className="p-1 align-middle">{l.createdate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Wrapper>
      <Modal show={spinner}>
        <div className="modal-dialog-centered justify-content-center" role="document">
          <Spinner animation="border" variant="primary" style={{ width: '120px', height: '120px', borderWidth: '8px' }} />
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  allleagues: state.allleagues
});

export default connect(mapStateToProps)(AllLeaguesList);
