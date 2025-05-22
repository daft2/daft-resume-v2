const CyberButton = ({
  title,
  trademark = "R25",
}: {
  title: string;
  trademark?: string;
}) => {
  return (
    <button className="cybr-btn p-4 w-full h-full text-xs xl:text-lg font-bold">
      {title}
      <span aria-hidden>_</span>
      <span aria-hidden className="cybr-btn__glitch">
        {title}_
      </span>
      <span aria-hidden className="cybr-btn__tag">
        {trademark}
      </span>
    </button>
  );
};

export default CyberButton;
