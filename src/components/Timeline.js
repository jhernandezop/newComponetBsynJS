import React, { Component } from 'react';
import './Timeline.css';  



class Timelines extends Component {


  constructor(props) {
    super(props);
    this.state = {
      timelinedata: [],
      uniqueid:""
    }
      //this.handleSubmit = this.handleSubmit.bind(this)
  }
// RECIBO EL MENSAJE
  componentDidMount () {


   
  }

  componentWillReceiveProps(nextProps){
   

    if(nextProps.edicion.length>=1){

        console.log(nextProps.edicion[0].ficha.caso_ES)
        const uid=nextProps.edicion[0].ficha.caso_ES
        this.state.uniqueid=uid
        console.log(this.state.uniqueid)
        this.handleSubmit()
    }else{
      this.setState({timelinedata:[]});
    }
    
  }
// ENVÍO MENSAJE AL SERVIDOR
  handleSubmit() {
    
    let uid = this.state.uniqueid //event.target.value
    console.log(this.state.uniqueid)
    console.log(uid)

    const tx=JSON.stringify({
          "tx"    : "anyQ",
          "index" : "gm_webleads_full_0.3",
          "query" :{
                    "sort" : [
                              { "ges_ts": { "order" : "desc"}
                    }
                    ],
          "_source": ["caso_ts", "ges_ts", "ges_resultado", "comentario_sv"],
          "query": {
          "bool": {
            "should": [
              {
                "term": {
                  "caso_S2_id.keyword": uid
                }
              }
            ]
          }
        }
      }
      })


     fetch("https://bscore.openpartner.cl/gdm", {
                "method": "POST",
                "headers": {
                "content-type": "text/plain"
                },
                "body": tx
              })
              .then(res => res.json())
              .then(response => {
                console.log(response)
                const hits=response.data.hits.hits
                this.setState({timelinedata:hits});
              })

      // acá guardo el estado
     // this.setState({...this.state.uniqueid, uid})
      //console.log(this.state.uniqueid)
      
  }

  render() {
   
    // acá actualizo el componente y recorro el estado com map


    const timelinedata = this.state.timelinedata.map((timeline, index) => {
      console.log('todo: '+ JSON.stringify(timeline._source.ges_ts));
      
      if(!timeline._source.ges_ts){
        console.log("A "+index)
         // esta es la primera gestion
         var str = timeline._source.caso_ts;
         //var res = str.split(".");
         //var fecha = res[0];

         //var str2 = fecha;
         //var res2 = str2.split("T");
         fecha = res2

         console.log(fecha)
        

          return <div className="registro"  key={timeline._id}>
                    <div className="fecha">{fecha}</div>
                    <div className="marca"></div>
                    <div className="actividad">
                        <div className="tag">Inicio</div>
                        <div className="comentario">aksdjhfka shdfjasdh faksjdhka sd askdhskdjhfakjshd faksdj hfasd kfak sdkjasd</div>
                    </div>
                  </div>
       
      }else{
        console.log("B "+index)
        var str = timeline._source.ges_ts;
        var res = str.split(".");
        var fecha = res[0];

        var str2 = fecha;
        var res2 = str2.split("T");
        fecha = res2[0]+' '+res2[1];

        console.log(fecha)
        console.log(timeline._source.ges_resultado.replace("_"," "))

        return <div className="registro" key={timeline._id}>
                    <div className="fecha"><div>{res2[0]}</div></div>
                    <div className="marca"><div className="linea"></div></div>
                    <div className="actividad">
                        
                        <div className="tag">{timeline._source.ges_resultado.replace("_"," ")}</div>
                        <div className="comentario"> aksdjhfkaj shdfjasdh faksjdhka sd askdhskdjhfakjshd faksdj hfasd kfak sdkjasd</div>
                    </div>

                   
              </div>
               
      }
      
      
    });
    
    // el return devuelve el conenido

    if(this.state.timelinedata.length>0){
      return(
            <div className="lineamanual">
              {timelinedata} 
            </div>
      )
    }else{
      return(<div className="lineamanual"></div>)
    }





  }
}

export default Timelines;





