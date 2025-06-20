import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { VolComponent } from "../vol/vol.component";
import { CommonModule } from '@angular/common';
import { PassengerService } from '../../services/passengers.service';
import { Passager } from '../../models/passager.model';
import { PassagerComponent } from "../passager/passager.component";
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle'

@Component({
    selector: 'app-liste-passagers',
    imports: [VolComponent, CommonModule, PassagerComponent, MatIcon, MatSlideToggle],
    templateUrl: './liste-passagers.component.html',
})
export class ListePassagersComponent implements OnChanges {

    @Input() flight!: Vol
    @Input() searchType!: string
    flightIsValid: boolean = false;
    passengers!: Passager[]
    showProfileImage: boolean = false

    constructor(private passengersService: PassengerService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['flight']) {
            this.flightIsValid = this.isNotNull();
            if (this.flightIsValid) {
                this.passengersService.getPassengers(this.flight.icao)
                    .subscribe({
                        next: (passengers) => {
                            this.passengers = passengers
                            console.log(this.passengers)
                        },
                        error: (error) => {
                            console.error('Erreur lors de la récupération des passagers :', error);
                        }
                    });
            }
        }
    }

    isNotNull() {
        return !!this.flight && Object.keys(this.flight).length > 0;
    }

    onToggleChange(event: MatSlideToggleChange) {
        this.showProfileImage = event.checked
    }

}