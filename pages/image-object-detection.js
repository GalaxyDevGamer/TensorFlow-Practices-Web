import * as cocossd from '@tensorflow-models/coco-ssd'
import * as webgl from '@tensorflow/tfjs-backend-webgl'
import { CircularProgress, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import Page from "./page";

export default function ImageObjectDetection() {
    const [loading, setLoading] = useState(false)
    const [imageURI, setImage] = useState('/assets/images/image96.png')
    const [myWindow, setWindow] = useState(null)
    const [cocoSsd, setModel] = useState(null)
    const [imagePredictions, setImagePredict] = useState([])

    useEffect(() => {
        setWindow(window)
        load()
    }, [])

    const load = async () => {
        setModel(await cocossd.load({ base: 'mobilenet_v2' }))
    }

    async function imagePredict(event) {
        console.log(cocoSsd)
        if (event.target.files && event.target.files[0]) {
            const fileReader = new myWindow.FileReader()
            fileReader.onload = async (e) => {
                setImage(e.target.result)
                setLoading(true)
                var img = new Image()
                img.width = 700
                img.height = 700
                img.src = e.target.result
                // const result = await cocoSsd.detect(img)
                // console.log(result)
                setImagePredict(await cocoSsd.detect(img))
                setLoading(false)
            }
            fileReader.readAsDataURL(event.target.files[0]);
        }
    }

    function renderImageResult() {
        if (loading) {
            return <CircularProgress />
        } else {
            if (imagePredictions.length == 0) {
                return <Typography>
                    Couldn't detect anything
                </Typography>
            }
            return <List>
                {imagePredictions.map(prediction => (
                    <ListItem key={prediction.class}>
                        <ListItemText primary={"Prediction: " + prediction.class + "\nProbability: " + prediction.score} />
                    </ListItem>
                ))}
            </List>
        }
    }

    function renderContent() {
        return <div>
            <Typography variant="h3">
                Image Object Detection
            </Typography><br />
            <div>
                <Typography variant="h6" >
                    Detecting object from an image
                </Typography>
                <img src={imageURI} style={{ width: 300, height: 300 }} /><br />
                <input type="file" onChange={imagePredict} className="filetype" accept="image/*" id="group_image" /><br /><br />
                {renderImageResult()}
            </div>
        </div>
    }

    return <Page content={renderContent()} />
}