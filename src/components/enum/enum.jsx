export const StatusProjectEnum = {
    PENDING: 'pending',
    DONE: 'done',
    ON_PROGRESS: 'on_progress',
    CLOSED: 'closed',
  };

export const  PositionEnum = {
    FE : 'fe',
    BE : 'be',
    FULLSTACK : 'fullstack',
    BA : 'ba',
    QA : 'qa',
    DEVOPS : 'devops',
    UX_UI : 'ux_ui',
  }
  
  
export const checkProjectStatus = (status) => {
    switch (status) {
      case StatusProjectEnum.PENDING:
        return 'Pending';
      case StatusProjectEnum.DONE:
        return 'Done';
      case StatusProjectEnum.ON_PROGRESS:
        return 'On Progress';
      case StatusProjectEnum.CLOSED:
        return 'Closed';
      default:
        return 'Unknown Status';
    }
  };

export const getStatusColor = (status) => {
    switch (status) {
      case StatusProjectEnum.ON_PROGRESS:
        return 'orange';
      case StatusProjectEnum.PENDING:
        return 'red';
      case StatusProjectEnum.DONE:
        return 'green';
      case StatusProjectEnum.CLOSED:
        return 'blue';
      default:
        return 'grey'; 
    }
}
  