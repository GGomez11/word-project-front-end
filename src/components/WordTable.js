import { makeStyles } from '@material-ui/core/styles' 
import Table from '@material-ui/core/Table' 
import TableBody from '@material-ui/core/TableBody' 
import TableCell from '@material-ui/core/TableCell' 
import TableContainer from '@material-ui/core/TableContainer' 
import TableHead from '@material-ui/core/TableHead' 
import TableRow from '@material-ui/core/TableRow' 
import Paper from '@material-ui/core/Paper' 

// Styling for table
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
  }) 


const WordTable = (props) =>{
    
    const classes = useStyles()

    return(
        <TableContainer className={classes.root} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Word</TableCell>
                        <TableCell align="left">Definitions</TableCell>
                        <TableCell align="left">Link</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.words?.map((row) => (
                    <TableRow style={{MuiTableCellRoot: '30px'}} key={row._id}>
                        <TableCell>{row.word}</TableCell>
                        <TableCell><ol>{row.definitions.map((def,i) => (
                            <li key={i}>{def.definition}</li>
                        ))}</ol></TableCell>
                        <TableCell><a href={row.link}>{row.link}</a></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) 
}
export default WordTable 