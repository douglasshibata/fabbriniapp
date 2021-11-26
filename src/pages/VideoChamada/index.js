import React from "react";
import { Grid } from "@material-ui/core";
import Navbar from '../Navbar'
import './style.css'
//import Prontuario from './prontuario'

export default function VideoChamada(props) {
    function Iframe(props) {
        return (<div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }} />);
    }
    //Local
  /*   const iframe2 = `
    <iframe
      src="https://tokbox.com/embed/embed/ot-embed.js?embedId=3f921956-053c-4671-aa28-dc2a4296cd44&room=DEFAULT_ROOM&iframe=true"
      scrolling="auto"
      allow="microphone; camera"
    ></iframe>
    `;  */
    //Produção
    const iframe1 = `
    <iframe
    src="https://tokbox.com/embed/embed/ot-embed.js?embedId=1c9ba970-9e31-423a-a7ad-27c15d4ab4b3&room=DEFAULT_ROOM&iframe=true"
    scrolling="auto"
    allow="microphone; camera"
    ></iframe>
    
    `;

    const newIframe = iframe1.replace('DEFAULT_ROOM', `sala${props.match.params.id}`);
    // const ehMedico = localStorage.getItem('ehMedico');
    return (
        <>
            <Navbar />
            <Grid container>
            <Grid item xs={12}>
                <Iframe iframe={newIframe} />
                </Grid>
            <Grid item xs={12}>
                    <textarea name="" id="" cols="2" rows="5"></textarea>
                </Grid>
                {/* {ehMedico === 'true'?
            <Prontuario />
            :<div></div>} */}
            </Grid>
        </>
    );
}