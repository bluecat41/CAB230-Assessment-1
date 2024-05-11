import { Map, Marker } from "pigeon-maps";

export default function VolcanoMap(props){
        // Converting latitude and longitude values into Numbers for Map component
        const lat = props.latitude;
        const latNum = Number(lat);
        const lng = props.longitude;
        const lngNum = Number(lng);
        // Colour for map marker
        const color = `hsl(39, 100%, 50%)`;

    return(
        <>
            <Map height={520} width={520} defaultCenter={[0,0]} defaultZoom={1}>
                <Marker width={50} color={color}anchor={[latNum, lngNum]} />
            </Map>
        </>
    )
}