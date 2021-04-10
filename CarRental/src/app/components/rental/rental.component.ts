import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  filterText:string
  rentals:Rental[]=[]
  constructor(private brandService: RentalService) {}

  ngOnInit(): void {
    this.brandService.getRentals().subscribe((response) => {
      this.rentals=response.data
    });
  }

}
