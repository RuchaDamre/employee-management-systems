import { API_URL } from "@/app/api";
import EmployeeView from "@/app/Components/EmployeeCompo/EmployeeView";

async function ViewEmployee({ params }: { params: { id: string } }) {
    const { id } = params;
    const response = await fetch(`${API_URL}/employees/${id}`);
    const json = await response.json();

    return (
        <div className="md:ml-[320px] mt-20">
            <EmployeeView empData={json} pathID={id} />
        </div>
    )
}

export default ViewEmployee;