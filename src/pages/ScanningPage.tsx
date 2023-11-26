import { IonContent, IonPage, isPlatform, useIonRouter } from "@ionic/react"

import "./ScanningPage.scss"
import { useEffect } from "react"
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Toast } from "@capacitor/toast";
import { eventCheckIn } from "../apis/user";

const ScanningPage = () => {
  const router = useIonRouter();
  const stopScan = () => {
    document.querySelector('body')?.classList.remove('scanner-active');
		BarcodeScanner.showBackground();
		BarcodeScanner.stopScan();
    router.goBack();
	};

  const startScan = async () => {
		if (isPlatform("ios")) {
			Toast.show({
				text: "iOS暂不支持扫码功能",
				duration: "short"
			})
			return;
		}
		// Check camera permission
		// This is just a simple example, check out the better checks below
		await BarcodeScanner.checkPermission({ force: true });
	
		// make background of WebView transparent
		// note: if you are using ionic this might not be enough, check below
		BarcodeScanner.hideBackground();
		document.querySelector('body')?.classList.add('scanner-active');
		const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
	
		// if the result has content
		if (result.hasContent) {
			console.log(result.content); // log the raw scanned content
			if (result.content.length < 10) {
				// event check in by qrcode
				eventCheckIn(result.content);
				window.open(result.content, '_blank')?.focus();
			} else {
				window.open(result.content, '_blank')?.focus();
			}
			stopScan();
		}
	};

  useEffect(() => {
    startScan();
  })

  const cancelScanning = () => {
    stopScan();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="scanerCancelContainer" onClick={cancelScanning}>
          X
        </div>
      </IonContent>
    </IonPage>
  )
}

export default ScanningPage;