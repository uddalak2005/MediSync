import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NewAppointments from "../componenets/OPDManager/NewAppointments.jsx";
import Appointments from "../componenets/OPDManager/Appointments.jsx";
import PersonalDetailsIPD from "../componenets/OPDManager/PersonalDetails.jsx";
import AddPatient from "../componenets/IPDManager/AddPatient.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NewAppointments">
                <NewAppointments/>
            </ComponentPreview>
            <ComponentPreview path="/Appointments">
                <Appointments/>
            </ComponentPreview>
            <ComponentPreview path="/PersonalDetailsIPD">
                <PersonalDetails/>
            </ComponentPreview>
            <ComponentPreview path="/AddPatient">
                <AddPatient/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews