import React from 'react';



class Rank extends React.Component {
    render(){
        const { name, entries} = this.props;
        return (
            <div >
            <div className=" white f3 center" >
                {`Hello ${name} your current entry count is...${entries}`}
            </div>
            <div className=" white f1 center">
                {'#1'}
            </div>
            </div>
    );
}
    
}

export default Rank;