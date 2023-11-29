import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar, isPlatform, useIonRouter } from "@ionic/react"

import "./ScanningPage.scss"
import { useState } from "react"
import { eventCheckIn } from "../apis/user";
import { useZxing } from "react-zxing";
import { Toast } from "@capacitor/toast";

const ScanningPage = () => {
	const [result, setResult] = useState("");
	const router = useIonRouter();

	const cancelScanning = () => {
		console.log(ref);
		useZxing({ paused: true });
	}

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
					router.push('/me', 'back');
				});
			}
		},
		paused: result !== "",
	});
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start" onClick={cancelScanning}>
						<IonBackButton text=""></IonBackButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div>
					<IonButton onClick={cancelScanning}>
						cancel
					</IonButton>
				</div>
				<div className="scannerContainer">
					<video ref={ref} />
				</div>
			</IonContent>
		</IonPage>
	)
}

export default ScanningPage;