import styles from './App.module.css';
import Header from "../Header/Header";
import Tools from "../LowerContent/Tools";
import {useState, useEffect} from 'react';
import Kraken from 'kraken';
import FormData from "form-data";
import FaceRecognition from "../../Components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";

const App = () => {

	// Face Detect States/Variables
	let convertedImgWidth = window.innerWidth/2;

	const [faceInputField, setFaceInputField] = useState({
		value: ""
	});

	const [convertedUrl, setConvertedUrl] = useState({
		url: ""
	});

	const [detectedFaces, setDetectedFaces] = useState({
		faces: []
	});

	const [foundFaces, setFoundFaces] = useState({
		found: false
	});

	const [findFaces, setFindFaces] = useState({
		find: false
	});
	///////////////////////////////////////////////////////////////


	// Text To Speech States/Variables
	const [textSpeechInputField, setTextSpeechInputField] = useState({
		value: ""
	});

	const [getSpeechConversion, setSpeechConversion] = useState({
		convert: false
	});
	///////////////////////////////////////////////////////////////////////////////


	// Text To Speech Functions
	const onTextSpeechInputChange = e => {
		setTextSpeechInputField({
			value: e.target.value
		});
	};

	const convertTextSpeech = () => {
		setSpeechConversion({
			convert: true
		});
	};

	const onTextSpeechKeyPress = e => {
		if (e.which === 13) {
			convertTextSpeech()
		}
	};
	/////////////////////////////////////////////////


	// Face Detect Functions
	const onFaceInputChange = e => {
		setFaceInputField({
			value: e.target.value
		});

		setFindFaces({
			find: false
		});

		setFoundFaces({
			found: false
		});

		setDetectedFaces({
			faces: []
		});

		setConvertedUrl({
			url: ""
		})
	};

	const resizeImage = (imgUrl, imgWidth) => {
		let converted_url = "";
		const kraken = new Kraken({
			api_key: "7a20d22ae0fc8b6315eeff138002a99f",
			api_secret: "08129aaf86f7afc4181618e596167e75a0839788",
		});

		const krakenData = {
			url: imgUrl,
			wait: true,
			resize: {
				width: imgWidth,
				strategy: "landscape"
			}
		};

		kraken.url(krakenData, (err, resp) => {
			if (typeof(resp) !== "undefined") {
				converted_url = resp.kraked_url
			}
		});

		setTimeout(() => {
			setConvertedUrl({
				url: converted_url
			})
		}, 4000)
	};

	const detectFaces = () => {
		resizeImage(faceInputField.value, convertedImgWidth);
		setFindFaces({
			find: true
		})
	};

	const onFaceKeyPress = e => {
		if (e.which === 13) {
			detectFaces()
		}
	};
	//////////////////////////////////////////////////////////////


	useEffect(()=> {
		if (findFaces.find) {
			const faceFormData = new FormData();
			faceFormData.append("api_key", "M-vc3wXc1iAHDKyPURtUYA4ih7vq0Rbt");
			faceFormData.append("api_secret", "57EkRLUPeopzqHNFOk4_Z6ub_vxpySED");
			faceFormData.append("image_url", convertedUrl.url);
			const formDataConfig = {
				method: "POST",
				body: faceFormData,
				redirect: "follow"
			};
			fetch("https://api-us.faceplusplus.com/facepp/v3/detect", formDataConfig)
				.then(resp => resp.text())
				.then(data => {
					const faces = JSON.parse(data).faces.map((data_Face) => {
						const {face_rectangle} = data_Face;
						return face_rectangle
					});
					
					if (faces.length === 0) {
				        	alert("Puede ser que su pantalla es muy chica de acuerdo a la imagen seleccionada, por lo cual no puede detectar caras!")
				        }

					setDetectedFaces({
						faces: faces
					});

					setFoundFaces({
						found: true
					});

					setFindFaces({
						find: false
					});

				})
				.catch(err => {
					alert("Algo ocurrio! Vuelve a intentar con otro imagen url")
				})
		}
		// eslint-disable-next-line
	}, [convertedUrl]);

	const api_tools = [
		{
			title: "Detector de Rostros",
			btn_text: "Detectar",
			api_callback: detectFaces,
			onInputChange: onFaceInputChange,
			onKeyPressAction: onFaceKeyPress,
			inputPlaceHolder: "Url del imagen"
		},
		{
			title: "Texto a Discurso",
			btn_text: "Convertir",
			api_callback: convertTextSpeech,
			onInputChange: onTextSpeechInputChange,
			onKeyPressAction: onTextSpeechKeyPress,
			inputPlaceHolder: "Texto para convertir"
		}
	];

	return (
		<div className={styles.app}>
			<Particles id="tsparticles"
					   options={{
						   background: {
							   color: {
								   value: "#000000"
							   },
							   size: {
							   	value: "cover"
							   },
							   repeat: {
							   	value: "no-repeat"
							   },
							   backgroundPosition: {
							   	value: "50% 50%"
							   }
						   },
						   fpsLimit: 30,
						   interactivity: {
							   detectsOn: "window",
							   events: {
								   onClick: {
									   enable: true,
									   mode: "push"
								   },
								   onHover: {
									   enable: true,
									   mode: "repulse"
								   },
								   resize: true
							   },
							   modes: {
								   grab: {
									   distance: 400,
									   lineLinked: {
										   opacity: 1
									   }
								   },
								   bubble: {
									   distance: 400,
									   size: 40,
									   duration: 2,
									   opacity: 8,
									   speed: 3
								   },
								   repulse: {
									   distance: 119.88011988011989,
									   duration: 0.4
								   },
								   push: {
									   particlesNb: {
									   	value: 4
									   }
								   },
								   remove: {
									   particlesNb: 2
								   }
							   }
						   },
						   particles: {
							   number: {
								   value: 114,
								   density: {
									   enable: true,
									   valueArea: 800
								   }
							   },
							   color: {
								   value: "#ffffff"
							   },
							   shape: {
								   type: "circle",
								   stroke: {
									   width: 0,
									   color: "#000000"
								   },
								   polygon: {
									   nbSides: 5
								   },
								   image: {
									   src: "img/github.svg",
									   width: 100,
									   height: 100
								   }
							   },
							   opacity: {
								   value: 0.5,
								   random: false,
								   anim: {
									   enable: false,
									   speed: 1,
									   opacityMin: 0.1,
									   sync: false
								   }
							   },
							   size: {
								   value: 3,
								   random: true,
								   anim: {
									   enable: false,
									   speed: 40,
									   sizeMin: 0.1,
									   sync: false
								   }
							   },
							   links: {
								   enable: true,
								   distance: 150,
								   color: "#ffffff",
								   opacity: 0.4,
								   width: 1
							   },
							   move: {
								   enable: true,
								   speed: {
								   	value: 6
								   },
								   direction: "none",
								   random: false,
								   straight: false,
								   outMode: "out",
								   bounce: {
								   	value: false
								   },
								   attract: {
									   enable: false,
									   rotateX: 600,
									   rotateY: 1200
								   }
							   }
						   },
						   detectRetina: true
					   }}
					   className={styles.particles}/>
			<div className={styles.app__header}>
				<Header faceRecognition={
					foundFaces.found ?
						<FaceRecognition imageUrl={convertedUrl.url} boxes={detectedFaces.faces}/> :
						null
				}/>
			</div>

            <div className={styles.app__lower_content}>
				{
					getSpeechConversion.convert ?
						<video src={`http://api.voicerss.org/?key=e4ddc02d04fa4203ba1a492a9d55e62e&hl=es-es&f=48khz_16bit_stereo&src=${textSpeechInputField.value}`}
							   autoPlay={true} onEnded={() => {
							   	setSpeechConversion({
									convert: false
								});
						}} className={'absolute'}/> :
					null
				}
				<Tools api_tools={api_tools}/>
            </div>
		</div>
	)
};

export default App;
