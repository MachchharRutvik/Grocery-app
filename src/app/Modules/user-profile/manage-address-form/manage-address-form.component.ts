import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ApiService } from 'src/app/Shared/Services/api/api.service';

@Component({
  selector: 'app-manage-address-form',
  templateUrl: './manage-address-form.component.html',
  styleUrls: ['./manage-address-form.component.css'],
})
export class ManageAddressFormComponent implements OnInit {
  constructor(private fb: FormBuilder,private router:Router,private api:ApiService,private route:ActivatedRoute) {}
  selectedState: any;
  citiesOfSelectedState: any;
  addressId:any
  ngOnInit(): void {
    console.log("hello form");
    
   this.addressId = this.route.snapshot.paramMap.get('id');
   if(this.addressId){
     console.log(this.addressId);
     this.api.getUserDetails().subscribe((res)=>{
      const userAddresses = res.data.addresses
      console.log(userAddresses,"useraddress");

      if(userAddresses){
        const existingAddress = userAddresses.find((res:any)=>{
          return res.id == this.addressId
        })
        console.log("existingAddewaa",existingAddress);
        this.manageAddressForm.patchValue(existingAddress);
        
      }
     })
   }
  }
  states = [
    { name: 'Andaman and Nicobar Islands', cities: ['Port Blair'] },
    {
      name: 'Andhra Pradesh',
      cities: [
        'Adoni',
        'Amaravati',
        'Anantapur',
        'Chandragiri',
        'Chittoor',
        'Dowlaiswaram',
        'Eluru',
        'Guntur',
        'Kadapa',
        'Kakinada',
        'Kurnool',
        'Machilipatnam',
        'Nagarjunakoṇḍa',
        'Rajahmundry',
        'Srikakulam',
        'Tirupati',
        'Vijayawada',
        'Visakhapatnam',
        'Vizianagaram',
        'Yemmiganur',
      ],
    },
    {
      name: 'Arunachal Pradesh',
      cities: ['Itanagar'],
    },
    {
      name: 'Assam',
      cities: [
        'Dhuburi',
        'Dibrugarh',
        'Dispur',
        'Guwahati',
        'Jorhat',
        'Nagaon',
        'Sibsagar',
        'Silchar',
        'Tezpur',
        'Tinsukia',
      ],
    },
    {
      name: 'Bihar',
      cities: [
        'Ara',
        'Baruni',
        'Begusarai',
        'Bettiah',
        'Bhagalpur',
        'Bihar Sharif',
        'Bodh Gaya',
        'Buxar',
        'Chapra',
        'Darbhanga',
        'Dehri',
        'Dinapur Nizamat',
        'Gaya',
        'Hajipur',
        'Jamalpur',
        'Katihar',
        'Madhubani',
        'Motihari',
        'Munger',
        'Muzaffarpur',
        'Patna',
        'Purnia',
        'Pusa',
        'Saharsa',
        'Samastipur',
        'Sasaram',
        'Sitamarhi',
        'Siwan',
      ],
    },
    {
      name: 'Chandigarh',
      cities: ['Chandigarh'],
    },
    {
      name: 'Chhattisgarh',
      cities: [
        'Ambikapur',
        'Bhilai',
        'Bilaspur',
        'Dhamtari',
        'Durg',
        'Jagdalpur',
        'Raipur',
        'Rajnandgaon',
      ],
    },
    {
      name: 'Dadra and Nagar Haveli and Daman and Diu',
      cities: ['Daman', 'Diu'],
    },
    {
      name: 'Delhi',
      cities: ['Delhi', 'New Delhi'],
    },
    {
      name: 'Goa',
      cities: ['Mormugao', 'Panaji'],
    },
    {
      name: 'Gujarat',
      cities: [
        'Ahmedabad',
        'Amreli',
        'Bharuch',
        'Bhavnagar',
        'Bhuj',
        'Dwarka',
        'Gandhinagar',
        'Godhra',
        'Jamnagar',
        'Junagadh',
        'Kandla',
        'Khambhat',
        'Kheda',
        'Mahesana',
        'Morvi',
        'Nadiad',
        'Navsari',
        'Okha',
        'Palanpur',
        'Patan',
        'Porbandar',
        'Rajkot',
        'Surat',
        'Surendranagar',
        'Valsad',
        'Veraval',
        'Vadodara',
      ],
    },
    {
      name: 'Haryana',
      cities: [
        'Ambala',
        'Bhiwani',
        'Chandigarh',
        'Faridabad',
        'Fatehabad',
        'Gurgaon',
        'Hisar',
        'Jhajjar',
        'Jind',
        'Kaithal',
        'Karnal',
        'Kurukshetra',
        'Mahendragarh',
        'Narnaul',
        'Narwana',
        'Palwal',
        'Panchkula',
        'Panipat',
        'Rewari',
        'Rohtak',
        'Sirsa',
        'Sonipat',
        'Tohana',
        'Yamunanagar',
      ],
    },
    {
      name: 'Himachal Pradesh',
      cities: [
        'Bilaspur',
        'Chamba',
        'Dalhousie',
        'Dharamsala',
        'Hamirpur',
        'Kangra',
        'Kullu',
        'Mandi',
        'Nahan',
        'Shimla',
        'Una',
      ],
    },
    {
      name: 'Jammu and Kashmir',
      cities: [
        'Anantnag',
        'Baramula',
        'Doda',
        'Gulmarg',
        'Jammu',
        'Kathua',
        'Leh',
        'Punch',
        'Rajauri',
        'Srinagar',
        'Udhampur',
      ],
    },
    {
      name: 'Jharkhand',
      cities: [
        'Bokaro',
        'Chaibasa',
        'Deoghar',
        'Dhanbad',
        'Dumka',
        'Giridih',
        'Hazaribag',
        'Jamshedpur',
        'Jharia',
        'Rajmahal',
        'Ranchi',
        'Saraikela',
      ],
    },
    {
      name: 'Karnataka',
      cities: [
        'Badami',
        'Ballari',
        'Bangalore',
        'Belgavi',
        'Bhadravati',
        'Bidar',
        'Chikkamagaluru',
        'Chitradurga',
        'Davangere',
        'Halebidu',
        'Hassan',
        'Hubballi-Dharwad',
        'Kalaburagi',
        'Kolar',
        'Madikeri',
        'Mandya',
        'Mangaluru',
        'Mysuru',
        'Raichur',
        'Shivamogga',
        'Shravanabelagola',
        'Tumkuru',
        'Udupi',
      ],
    },
    {
      name: 'Kerala',
      cities: [
        'Alappuzha',
        'Badagara',
        'Idukki',
        'Kannur',
        'Kochi',
        'Kollam',
        'Kottayam',
        'Kozhikode',
        'Mattancherry',
        'Palakkad',
        'Thalassery',
        'Thiruvananthapuram',
        'Thrissur',
      ],
    },
    {
      name: 'Ladakh',
      cities: ['Kargil', 'Leh'],
    },
  ];

  manageAddressForm = this.fb.group({
    address_line_1: ['', Validators.required],
    address_line_2: ['', Validators.required],
    area: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    postal_code: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
    landmark: ['', Validators.required],
    tag: ['', Validators.required],
  });

  get addressLine1() {
    return this.manageAddressForm.get('address_line_1');
  }
  get addressLine2() {
    return this.manageAddressForm.get('address_line_2');
  }
  get area() {
    return this.manageAddressForm.get('area');
  }
  get city() {
    return this.manageAddressForm.get('city');
  }
  get state() {
    return this.manageAddressForm.get('state');
  }
  get country() {
    return this.manageAddressForm.get('country');
  }
  get postalCode() {
    return this.manageAddressForm.get('postal_code');
  }
  get landmark() {
    return this.manageAddressForm.get('landmark');
  }
  get tag() {
    return this.manageAddressForm.get('tag');
  }

  onStateSelect() {
    let state = this.manageAddressForm.get('state')?.value;

    this.citiesOfSelectedState = this.states.find((res) => {
      return res.name === state;
    });
    this.citiesOfSelectedState = this.citiesOfSelectedState.cities;
  }
  addAddress(){
    const formValues = this.manageAddressForm.getRawValue();
    console.log("formvalues",formValues)
    this.api.addAddress(formValues).subscribe((res)=>{
      console.log("add address res",res);
      alert("Address added successfully");
      this.router.navigate(['user-profile/manage-addresses'])
    },(err)=>{
      console.log("add address err",err);
    });
  }
  updateAddress(){
    const updatedValues = this.manageAddressForm.getRawValue()
    console.log(updatedValues,"updatedValues");
    this.api.updateAddress(this.addressId,updatedValues)
    
  }

}
