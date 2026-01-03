import EmployeeEdit from "@/app/Components/EmployeeCompo/EmployeeEdit";

async function Edit({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <>
            <EmployeeEdit id={id} />
        </>
    )
}

export default Edit;