export const ACTION_BUTTONS = ({ Icons, handleClick, row }) =>
    Icons.map(({ path, label, key }) => (
        <img
            src={path}
            alt={label}
            width={"20"}
            height={"20"}
            className="mx-2 hover"
            title={label}
            key={key}
            onClick={() => handleClick(key, row)}
        />
    ));