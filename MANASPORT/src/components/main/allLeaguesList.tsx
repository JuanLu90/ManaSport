//React´s Components
import React, { useState } from "react";
import { Link } from "react-router-dom";
//Components made by Juanlu
import DeleteLeagueModal from "./leagueDeleteModal";
import EditLeagueModal from "./leagueEditModal";
//React Bootstrap
import { Button, InputGroup, Form, Table, Modal, Alert } from "react-bootstrap";
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
        color: #BDBDBD;
    text-transform: uppercase;
`;


//----------------------------------------------------



//Global Props
interface IProps { }
interface IPropsGlobal {
  allleagues: ITournament[];
}

const AllLeaguesList: React.FC<IProps & IPropsGlobal> = props => {


  return (
    <Wrapper className="container-fluid">
      <div className="row mt-4 justify-content-center">
        <div className="col-10">
          <Title>Ligas:</Title>
        </div>
      </div>
      <div className="row mt-1 justify-content-center">
        <div className="col-10 p-3 text-center">
          <Table responsive="md" variant="dark" striped hover className=" border border-secondary">
            <TableHead>
              <tr>
                <th />
                <th />
                <th>ADMINISTRADOR</th>
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
                  <td className="p-1 align-middle">
                    <Link
                      to={"/leagues/allleaguesDetails/" + l.TournamentId}
                      className="btn text-warning p-0"
                    >
                      {l.name}
                    </Link>
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
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  allleagues: state.allleagues
});

export default connect(
  mapStateToProps
)(AllLeaguesList);
