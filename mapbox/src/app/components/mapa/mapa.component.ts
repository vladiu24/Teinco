import { Component, OnInit } from '@angular/core';
import {Lugar} from '../../interfaces/interfaces';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
mapa!:mapboxgl.Map;
lugares: Lugar[] = [{
  id: '1',
  nombre: 'Fernando',
  lng: -75.75512993582937,
  lat: 45.349977429009954,
  color: '#dd8fee'
},
{
  id: '2',
  nombre: 'Amy',
  lng: -75.75195645527508, 
  lat: 45.351584045823756,
  color: '#790af0'
},
{
  id: '3',
  nombre: 'Orlando',
  lng: -75.75900589557777, 
  lat: 45.34794635758547,
  color: '#19884b'
}];
constructor() { }

  ngOnInit(){
    this.crearMapa();
  }
  crearMapa(){
    (mapboxgl as any).accessToken='pk.eyJ1IjoiY2VzYXJhdWd1c3RvbG9wZXoiLCJhIjoiY2wyZ3VpMnZnMDA5MDNicXBscGYyOGFuYSJ9.EZC70IiwG-XL_0iwQ_kEOQ';
    this.mapa=new mapboxgl.Map({
      container:'mapa',
      style:'mapbox://styles/mapbox/streets-v11',
      center:[-75.75512993582937,45.349977429009954],
      zoom:16
    });
    for(const marcador of this.lugares){
      this.agregarMarcador(marcador);
    }
  }

agregarMarcador(marcador:Lugar){
    console.log(marcador);
    const h2=document.createElement('h2');
    h2.innerText=marcador.nombre;
  
    const btnBorrar=document.createElement('Button');
    btnBorrar.innerText='Borrar';
  
    const div=document.createElement('div');
    div.append(h2,btnBorrar);
  
    const customPopup=new  mapboxgl.Popup({
      offset:25,
      closeOnClick:false
    }).setDOMContent(div);
const marker=new mapboxgl.Marker({
      draggable:true,
      color:marcador.color
    })
    .setLngLat([marcador.lng, marcador.lat])
    .addTo(this.mapa)
    .setPopup(customPopup)
    

    marker.on('drag',()=>{
      const LngLat=marker.getLngLat();
      console.log(LngLat);
    });

    btnBorrar.addEventListener('click',()=>{
      marker.remove();
    }) 

}
 
crearMarcador(){
  const custoMarcker:Lugar={
    id: new Date().toISOString(),
    nombre: 'sin nombre',
    lng: -75.75195645527508,
    lat: 45.351584045823756,
    color: '#' + Math.floor(Math.random()*16777215).toString(16)
  };
  this.agregarMarcador(custoMarcker);
  }

}

