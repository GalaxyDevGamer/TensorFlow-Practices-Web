import * as tfjs from '@tensorflow/tfjs'
import * as toxicity from '@tensorflow-models/toxicity'
import Page from "./page"
import { useEffect, useState } from 'react'
import { Button, CircularProgress, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core'

export default function ToxicityClassifier() {
    const [model, setModel] = useState(null)
    const [predictions, setPredictions] = useState([])
    const [sentence, setSentence] = useState("")
    const [loading, setLoading] = useState(false)
    // The minimum prediction confidence.
    const threshold = 0.9

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        setModel(await toxicity.load(threshold))
    }

    async function predictToxicity() {
        setLoading(true)
        const result = await model.classify(sentence);
        setPredictions(result)
        setLoading(false)
    }

    function renderResult() {
        if (loading) {
            return <CircularProgress />
        } else {
            return <List>
                {predictions.map(prediction => (
                    <ListItem key={prediction.label}>
                        <ListItemText primary={prediction.label + ": " + prediction.results[0].match} />
                    </ListItem>
                ))}
            </List>
        }
    }

    function renderContent() {
        return <div>
            <Typography variant="h3" paragraph>
                {`Toxicity Classifier`}
            </Typography>
            <Typography paragraph>
                Identifying the toxicity of the sentence
            </Typography>
            <Typography>
                Sentence
            </Typography>
            <TextField style={{ width: 500 }} rows={5} value={sentence} multiline onChange={e => setSentence(e.target.value)} /><br />
            <Button variant="outlined" onClick={() => predictToxicity()}>
                Identify toxicity
            </Button>
            {renderResult()}
        </div>
    }

    return <Page content={renderContent()} />
}