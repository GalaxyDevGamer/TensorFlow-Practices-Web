import { Button, CircularProgress, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
import * as qna from '@tensorflow-models/qna'
import * as tfjs from '@tensorflow/tfjs'
import { useEffect, useState } from 'react';
import Page from "./page";

const samplePassage = "Google LLC is an American multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware. It is considered one of the Big Four technology companies, alongside Amazon, Apple, and Facebook. Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002. An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page who became the CEO of Alphabet."
const sampleQuestion = "Who is the CEO of Google?"

export default function NaturalLanguageQA() {
    const [model, setModel] = useState(null)
    const [passage, setPassage] = useState(samplePassage)
    const [question, setQuestion] = useState(sampleQuestion)
    const [answer, setAnswer] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        setModel(await qna.load())
    }

    async function predictAnswer() {
        setLoading(true)
        const result = await model.findAnswers(question, passage);
        setAnswer(result)
        setLoading(false)
    }

    function renderAnswer() {
        if (loading) {
            return <CircularProgress />
        } else {
            if (answer.length == 0) {
                return <Typography>
                    Couldn't figure out answer
                </Typography>
            }
            return <List>
                {answer.map(prediction => (
                    <ListItem key={prediction.score}>
                        <ListItemText primary={"Prediction: " + prediction.text + "\nProbability: " + prediction.score} />
                    </ListItem>
                ))}
            </List>
        }
    }

    function renderContent() {
        return <div>
            <Typography variant="h3" paragraph>
                {`Natural Language Q&A`}
            </Typography>
            <Typography paragraph>
                Finding the answers based on passage
            </Typography>
            <Typography>
                Passage
            </Typography>
            <TextField style={{ width: 500 }} rows={5} value={passage} multiline onChange={e => setPassage(e.target.value)} />
            <Typography>
                Question
            </Typography>
            <TextField style={{ width: 500 }} value={question} onChange={e => setQuestion(e.target.value)} /><br />
            <Button variant="outlined" onClick={() => predictAnswer()}>
                Find Answer
            </Button>
            {renderAnswer()}
        </div>
    }

    return <Page content={renderContent()} />
}