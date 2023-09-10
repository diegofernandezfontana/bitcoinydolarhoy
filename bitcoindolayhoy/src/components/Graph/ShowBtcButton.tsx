const ShowBtcButton = ({
  onClick,
  isDisplayed,
}: {
  onClick: any;
  isDisplayed: boolean;
}) => {
  return (
    <div className={"flex align-middle"}>
      <p className="mr-1">Mostrar precios BTC </p>
      <button
        className="relative h-full w-24"
        onClick={() => onClick(!isDisplayed)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute duration-200"
          width="24"
          height="24"
          opacity={isDisplayed ? 1 : 0}
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#fff"
          fill="#16a34a"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l2 2l4 -4" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#2c3e50"
          fill="none"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>
      </button>
    </div>
  );
};

export default ShowBtcButton;
