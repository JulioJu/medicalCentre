import { TestBed, inject } from '@angular/core/testing';

import { NurseService } from './nurse.service';

describe('NurseService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NurseService]
        });
    });

    it('should be created',
        inject([NurseService], (service: NurseService) => {
            expect(service)
                .toBeTruthy();
        }));
});
