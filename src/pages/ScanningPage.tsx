import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, isPlatform, useIonRouter } from "@ionic/react"

import "./ScanningPage.scss"
import { useEffect, useState } from "react"
import { eventCheckIn } from "../apis/user";
import { useZxing } from "react-zxing";
import { Toast } from "@capacitor/toast";
import { StatusBar } from "@capacitor/status-bar";

const ScanningPage = () => {
	const [result, setResult] = useState("");
	const router = useIonRouter();
	
	// Hide status bar and tab bar to fit full screen
	useEffect(() => {
		StatusBar.hide();
		document.getElementById("app-tab-bar")?.style.setProperty("opacity", "0");
		return () => {
			document.getElementById("app-tab-bar")?.style.removeProperty("opacity");
			StatusBar.show();
		};
	}, [])
	const { ref } = useZxing({
		onDecodeResult(result) {
			setResult(result.getText());
			console.log(result.getText());
			if (result.getText().length >= 5 && result.getText().length <= 10) {
				eventCheckIn(result.getText()).then((res) => {
					Toast.show({
						text: res,
						duration: 'short'
					});
				});
			} else {
				Toast.show({
					text: "Invalid QR Code: " + result.getText(),
					duration: "short"
				})
			}
			goBack();
		},
		paused: result !== "",
	});

	const goBack = () => {
		router.push("/me", 'back');
	}
	return (
		<IonPage>
			<IonContent fullscreen className="scannerContainer">
				<div className="goBackButtonContainer">
					<div onClick={goBack} className="goBackButton">
						<div className="goBackButtonTop"></div>
						<div className="goBackButtonBottom"></div>
					</div>
				</div>
				<div className="scanningAnimaionContainer">
					<div className="scanningAnimation" />
				</div>
				<div className="scannerContainer">
					<video ref={ref} />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default ScanningPage;