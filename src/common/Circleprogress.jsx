const Circleprogress = ({ project }) => {
    const process = project.process || 0;

    return (
      <Progress
        type="circle"
        percent={process}
        width={50}
        format={() => `${process}%`}
        strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
          
        }}
      />
    );
  };
