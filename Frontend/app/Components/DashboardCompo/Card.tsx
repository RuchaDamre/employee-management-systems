import { IconType } from "react-icons";

type Props = {
    heading: string,
    count?: number,
    icon: IconType,
    color: string,
    salary: boolean,
}

function Card({ heading, count, icon: Icon, color, salary }: Props) {
    return (
        <div className="flex bg-white w-60 gap-6 items-center">
            <span className={`${color} md:text-2xl p-3 text-white`}><Icon /></span>
            <div className="flex flex-col">
                <h3 className="text-sm md:text-base">{heading}</h3>
                <p className="font-bold text-sm md:text-base">{salary ? `$ ${count}` : `${count}`}</p>
            </div>
        </div>
    )
}

export default Card;