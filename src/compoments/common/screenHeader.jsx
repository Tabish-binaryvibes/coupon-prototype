import { useNavigate } from "react-router-dom";
import AddIcon from '../../assets/images/icons/Add.svg'

export default function ScreenHeader({ title, actionLabel, syncData, disabled }) {
    const navigate = useNavigate();

    return (
        <div className="row align-items-center py-4 px-3 bg-white rounded">
            <div className="col">
                <h2 className="font-family-jakarta-bold">{title}</h2>
            </div>
            <div className="col text-end">
                {actionLabel && <button className="btn btn-primary"
                    disabled={disabled}
                    onClick={syncData}>
                    {actionLabel}
                </button>
                }
            </div>
        </div>
    );
}
