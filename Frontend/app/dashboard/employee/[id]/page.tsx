import { API_URL } from "@/app/api";
import EmployeeView from "@/app/Components/EmployeeCompo/EmployeeView";

async function ViewEmployee({ params }: { params: { id: string } }) {
    const { id } = await params;
    const response = await fetch(`${API_URL}/employee/${id}`);
    const json = await response.json();

    return (
        <div className="md:ml-82 mt-20">
            <EmployeeView empData={json.employee[0]} pathID={id} />
        </div>
    )
}

export default ViewEmployee;