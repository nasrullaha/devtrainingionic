import { Component, ViewChild, Renderer } from '@angular/core';
import { NavController, Platform, normalizeURL, Content } from 'ionic-angular';
import { File, IWriteOptions } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
 
const STORAGE_KEY = 'IMAGE_LIST';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Canvas stuff
  @ViewChild('imageCanvas') canvas: any;
  canvasElement: any;
 
  saveX: number;
  saveY: number;
 
  storedImages = [];
 
  // Make Canvas sticky at the top stuff
  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;
 
  // Color Stuff
  selectedColor = '#9e2956';
 
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
 
  constructor(public navCtrl: NavController, private file: File, private storage: Storage, public renderer: Renderer, private plt: Platform) {
    // Load all stored images when the app is ready
    this.storage.ready().then(() => {
      this.storage.get(STORAGE_KEY).then(data => {
        if (data != undefined) {
          this.storedImages = data;
        }
      });
    });
  }
 
  ionViewDidEnter() {
    // https://github.com/ionic-team/ionic/issues/9071#issuecomment-362920591
    // Get the height of the fixed item
    let itemHeight = this.fixedContainer.nativeElement.offsetHeight;
    let scroll = this.content.getScrollElement();
 
    // Add preexisting scroll margin to fixed container size
    itemHeight = Number.parseFloat(scroll.style.marginTop.replace("px", "")) + itemHeight;
    scroll.style.marginTop = itemHeight + 'px';
  }
 
  ionViewDidLoad() {
    // Set the Canvas Element and its size
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 200;
  }
 
}